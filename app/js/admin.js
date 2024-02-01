$(function(){
	if( $('.admin__body.tiles.container').length > 0 ){
		$('#main_block').sortable({
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
	}
	if( $('.admin__body.promo-edit.container').length > 0 ){
		tinymce.init({
			selector: "textarea#editor",
			width: '100%',
			height: 400,
			plugins: ["code", "paste"],
			formats: {
				removeformat : [
					{selector : 'h1,h2,h3,h4,h5,h6,pre,a',
					block : 'p', remove : 'all', split : true, expand : false, block_expand : true, deep : true},
					{selector : 'address,article,b,big,blockquote,center,cite,code,date,dd,del,dfn,dl,dt,em,embed,font,footer,' +
					'header,hgroup,i,ins,kbd,link,menu,nav,object,param,q,s,samp,script,' +
					'section,small,strike,strong,style,sub,sup,time,tt,u,var',
					remove : 'all', split : true, expand : false, block_expand : true, deep : true},
					{selector : 'span', attributes : ['style','class'], remove : 'empty', split : true, expand : false, deep : true},
					{selector : 'table', attributes : ['cellpadding','cellspacing','border'], split : false, expand : false, deep : true},
					{selector : '*', attributes : ['style','color','bgcolor','title','lang'], split : false, expand : false, deep : true}
				]
			},
			toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
			// content_css: "/css/editor.css"
		});
		$.datetimepicker.setLocale('uk');
		$("input[name^='date-']").datetimepicker({
			timepicker:false,
			minDate: 0,
			format:"d.m.Y",
			validateOnBlur:false
		});
	}
});