<script lang="ts">
	//imports
	import { onMount } from 'svelte';
    import {jyotishStore} from '../stores/jyotish.store';
    import {JyotishViewModel} from "$lib/viewmodel/jyotish.viewmodel";
    let jyotishViewModel:JyotishViewModel=new JyotishViewModel();

	//props

	//states

	//reactive states

	//functions

	//life cycles
	onMount(() => {
        jyotishViewModel.fetchConsultants('',20);
    });
</script>

<div>
    {JSON.stringify($jyotishStore.consultantList)}
</div>

<style>

</style>
