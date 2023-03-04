<script lang="ts" context="module">
    import TopAppBar, {Row, Section, Title} from '@smui/top-app-bar';
    import { setLocale } from '../i18n/i18n-svelte'

    setLocale("en");
</script>
<style lang="scss">

</style>


<div id="app">
    <TopAppBar variant="static">
        <Row>
            <Title>Codeverse</Title>
            <Section align="end" toolbar>
                <a href="/">Home</a>
                <a href="/">Login</a>
                <a href="/">Change Langueage</a>
            </Section>
        </Row>
    </TopAppBar> 

    <slot />

    <footer>
        <p>Copyright 2023. Kemanen. All rights reserved.</p>
    </footer>
</div>
