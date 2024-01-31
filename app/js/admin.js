$(function(){
	$('#main_block').sortable({
		// axis: 'y',
		connectWith: $('#search_block'),
		revert: true,
		handle: 'i.dragging',
		helper: 'clone'
	});
	$('#search_block').sortable({
		connectWith: $('#main_block'),
		revert: true,
		handle: 'i.dragging'
	});
	$('#main_block').disableSelection();
});