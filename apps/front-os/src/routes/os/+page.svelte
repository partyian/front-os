<script lang=ts>
	import calculator from "$lib/applications/calculator";
    import noteable from "$lib/applications/noteable"
	import settings from "$lib/applications/settings";
	import tasker from "$lib/applications/tasker";
	import { typewriter } from "$lib/transitions";
	import { onDestroy, onMount } from "svelte";
	import { themeChange } from "theme-change";
	import { Commands } from "$lib/os/keymap";
	import { os } from "$lib";

    let escaped: boolean = false 

    const off = os.keymap.on(Commands.CANCEL, "modal", (...args) => {
        escaped = true

        setTimeout(() => {
            escaped = false
        }, 1000)
    })

    $: windowProcesses = os.processes.windows()
    $: time = os.time;

    let show: boolean = false;

    const timeFormatter = new Intl.DateTimeFormat(
		'en',
		{
			hour12: false,
			hour: 'numeric',
			minute: '2-digit'
		}
	);
    const dateFormatter = new Intl.DateTimeFormat(
		'en',
		{
			day: '2-digit',
            month: '2-digit',
            year: 'numeric'
		}
	);

    onMount(() => {
        themeChange(false);
        show = true;
    })

    onDestroy(() => off())
</script>

<div 
    class="w-screen h-screen flex flex-col"
>
    <div class="relative w-full flex-1 flex items-center justify-center" data-window-container="true">
        <div class="mockup-code shadow-lg">
            {#if show}
                <pre data-prefix="$"><code in:typewriter={{ speed: 1 }}>Welcome to FrontOS...</code></pre>
            {/if}
            {#if escaped}
                <pre data-prefix="$"><code in:typewriter={{ speed: 10 }}>A burglar escaped the building...</code></pre>
            {/if}
        </div>
        {#each $windowProcesses as process}
            <svelte:component 
                this={process.app.components.window} 
                {process}
            />
        {/each}
    </div>
    <div class="div w-full flex p-5">
        <div class="bg-neutral rounded-box flex-1 h-16 grid grid-cols-3 px-5 shadow-md">
            <div class="flex items-center justify-start"></div>
            <div class="flex items-center justify-center">
                <a class="btn btn-square btn-neutral" target="_blank" href="https://github.com/partyian/front-os">
                    <img src="/github.svg" class="h-7 w-7" alt="FrontOS Github" />
                </a>
                <button class="tooltip btn btn-square btn-neutral flex items-center justify-center" 
                        data-tip={calculator.name}
                        on:click={() => os.processes.open(calculator)}
                >
                    <img src={calculator.icon} alt={calculator.name} class="w-6 h-6" />
                </button>
                <button class="tooltip btn btn-square btn-neutral flex items-center justify-center" 
                        data-tip={noteable.name}
                        on:click={() => os.processes.open(noteable)}
                >
                    <img src={noteable.icon} alt={noteable.name} class="w-6 h-6" />
                </button>
                <button class="tooltip btn btn-square btn-neutral flex items-center justify-center" 
                        data-tip={tasker.name}
                        on:click={() => os.processes.open(tasker)}
                >
                    <img src={tasker.icon} alt={tasker.name} class="w-6 h-6" />
                </button>
                <button class="tooltip btn btn-square btn-neutral flex items-center justify-center" 
                        data-tip={settings.name}
                        on:click={() => os.processes.open(settings)}
                >
                    <img src={settings.icon} alt={settings.name} class="w-6 h-6" />
                </button>
            </div>
            <div class="flex items-center justify-end text-neutral-content">
                <div class="flex flex-col text-right">
                    <span class="text-sm">{timeFormatter.format($time)}</span>
                    <span class="text-sm">{dateFormatter.format($time)}</span>
                </div>
            </div>
        </div>
    </div>
</div>