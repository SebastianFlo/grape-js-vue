<template>
    <div class="preview">
        <div v-html="rawHtml"></div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'Preview',
        data: function() {
            return {
                rawHtml: '',
                css: '',
            }
        },
        props: {
            id: String,
        },
        mounted: function () {
            if (!this.id) {
                return;
            }
            this.checkTemplates();
        },
        methods: {
            //   TODO: Abstract this to a API layer
            checkTemplates() {
                axios
                    .get(`api/templates/${this.id}`)
                    .then(response => {
                        let { html, css } = response.data;
                        this.rawHtml = html;
                        this.generateStyle(css);
                    })
                    .catch(error => {
                        console.error('Loading templates', error);
                    });
            },
            generateStyle(css) {
                const head = document.head || document.getElementsByTagName('head')[0];
                const style = document.createElement('style');

                style.type = 'text/css';
                if (style.styleSheet){
                    // This is required for IE8 and below.
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }

                head.appendChild(style);
            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }
</style>