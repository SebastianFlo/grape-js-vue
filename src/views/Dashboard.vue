<template>
    <div id="gjs">
        <h1>Hello World Component!</h1>
    </div>
</template>

<script>
    import grapesjs from 'grapesjs';

    export default {
        name: 'dashboard',
        data: function () {
            return {
                editor: null
            }
        },
        mounted: function () {
            this.editor = grapesjs.init({
                // Indicate where to init the editor. You can also pass an HTMLElement
                container: '#gjs',
                // Get the content for the canvas directly from the element
                // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
                fromElement: true,
                // Size of the editor
                height: '600px',
                width: 'auto',
                // Disable the storage manager for the moment
                storageManager: { type: null },
                // Avoid any default panel
                panels: { defaults: [] },
            });

            this.editor.on('change', this.change);
        },
        methods: {
            change() {
                this.$emit('change', this.editor.getHtml());
            },
        },
    }
</script>

<style>
    /* Let's highlight canvas boundaries */

    #gjs {
        border: 3px solid #444;
    }

    /* Reset some default styling */

    .gjs-cv-canvas {
        top: 0;
        width: 100%;
        height: 100%;
    }
</style>