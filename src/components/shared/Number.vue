<template>
    <div class="number-wrapper">
        <p class="number">
            <slot></slot>
        </p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style>
    .number-wrapper {
        /* - From parent */
        justify-self: center;
        align-self: center;
        /* --- */
        display: flex;
        justify-content: center;
        align-items: center;
        width: 3.125rem;
        height: 3.125rem;
        text-align: center;
        font-weight: bold;
        color: white;
        border-radius: 50%;
        user-select: none;
        background-color: rgb(50, 142, 218);
        border: 0.0714rem solid black;
        transition: background-color 0.2s ease-in-out,
                    color 0.2s ease-in-out;
    }
    .number {
        user-select: none;
        pointer-events: none;
    }
    .empty {
        background-color: white;
        border-color: black;
    }
</style>
