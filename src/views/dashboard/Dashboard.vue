<template>
    <section>
        <div id="gjs"></div>
        <div id="blocks"></div>
        <button @click="saveEdits()">Save</button>
    </section>
</template>

<script>
    import grapesjs from 'grapesjs';
    import axios from 'axios';

    export default {
        name: 'dashboard',
        data: function () {
            return {
                editor: null,
                LandingPage: {
                    html: `<div>Emtpy Page</div>`,
                    css: null,
                    components: null,
                    style: null,
                },
                templateId: 1
            }
        },
        mounted: function () {
            this.editor = grapesjs.init({
                container: '#gjs',
                autorender: 0,
                components: this.LandingPage.components || this.LandingPage.html,
                style: this.LandingPage.style || this.LandingPage.css,
                blockManager: {
                    appendTo: '#blocks',
                    blocks: [
                        {
                            id: 'section', // id is mandatory
                            label: '<b>Section</b>', // You can use HTML/SVG inside labels
                            attributes: { class:'gjs-block-section' },
                            content: `<section>
                            <h1>This is a simple title</h1>
                            <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
                            </section>`,
                        }, {
                            id: 'text',
                            label: 'Text',
                            content: '<div data-gjs-type="text">Insert your text here</div>',
                        },
                    ]
                },
                storageManager: {
                    id: '',
                    type: 'remote',
                    autosave: false,
                    autoload: false,
                    contentTypeJson: true,
                    urlStore: `api/templates/${this.templateId}`,
                    urlLoad: `api/templates/${this.templateId}`,
                }
            });

            this.editor.on('storage:load', e => {
                this.editor.render();
            });

            this.editor.on('change', this.change);

            this.checkTemplates();
        },
        methods: {
            change() {
                this.$emit('change', this.editor.getHtml());
            },
            saveEdits() {
                this.editor.store();
            },
            checkTemplates() {
                axios
                    .get(`api/templates/${this.templateId}`)
                    .then(response => {
                        this.editor.load();
                    })
                    .catch(error => {
                        this.editor.render();
                    });
            }
        },
    }
</script>

<style>
    /* Let's highlight canvas boundaries */

    #gjs {
        border: 3px solid #444;
    }

    /* Reset some default styling */

    /* .gjs-cv-canvas { */
        /* top: 0; */
        /* width: 100%;
        height: 100%; */
    /* } */

    .gjs-block {
        width: auto;
        height: auto;
        min-height: auto;
    }

    .panel__top {
        padding: 0;
        width: 100%;
        display: flex;
        position: initial;
        justify-content: center;
        justify-content: space-between;
    }

    .panel__basic-actions {
        position: initial;
    }

    .editor-row {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex-wrap: nowrap;
        height: 300px;
    }

    .editor-canvas {
        flex-grow: 1;
    }

    .panel__right {
        flex-basis: 230px;
        position: relative;
        overflow-y: auto;
    }

    .panel__switcher {
        position: initial;
    }
</style>