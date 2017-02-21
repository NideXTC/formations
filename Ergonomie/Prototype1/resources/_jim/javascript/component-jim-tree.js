/*!
 * Copyright 2013 Justinmind. All rights reserved.
 */

/*
 * jimTree
 * @author: Burkhard.Mayer [at] Justinmind.com 
 */
function checkEmptyNodes($tree, initialstate){
  $tree.find("li."+initialstate+":has(> ul:has(> li))").each(function(){
    var allgood = true;
    $(this).children("ul:first").children("li").each(function(){
      if($(this).css("display") !== "none"){
        allgood = false;
      }
    });
    if(allgood){
      $(this).removeClass(initialstate).addClass("leaf");
    }else{
      $(this).removeClass("leaf");
    }
  }); 
}

(function($) {
  $.fn.jimTree = function(options) {

    /* private functions */
    function buildTree(tree) {
      $.fn.jimTree.update(tree);

      if (opts.persistNodeState && page && jimData.jimTreeNodeState && jimData.jimTreeNodeState[page]) {
        var i;
        if (jimData.jimTreeNodeState[page].closedNodes) {
          for (i = 0; i < jimData.jimTreeNodeState[page].closedNodes.length; i++) {
            $("#" + jimData.jimTreeNodeState[page].closedNodes[i]).removeClass("open").removeClass("closedSub").removeClass("leaf").addClass("closed");
          }
        }

        if (jimData.jimTreeNodeState[page].openNodes) {
          for (i = 0; i < jimData.jimTreeNodeState[page].openNodes.length; i++) {
            $("#" + jimData.jimTreeNodeState[page].openNodes[i]).removeClass("closed").removeClass("openSub").removeClass("leaf").addClass("open");
          }
        }
      }
    }

    function addEvents(tree) {
      $(tree).bind("click", function(event) {
        if (jimUtil.isAnnotationInactive()) {
          var $node = jQuery(event.target || event.srcElement).closest("li");
          if ($node.hasClass("open")) {
            $node.removeClass("open").addClass("closed");
          } else if ($node.hasClass("closed")){
            $node.removeClass("closed").addClass("open");
            $node.children("ul.closed").removeClass("closed"); 
          }
        }
      });
    }

    function addUnloadEvent() {
      jQuery("#simulation").bind("pageunload", function() {
        /* only save when the project has at least a tree component, not counting the project screens tree */
        if(page) {
          if(jimData.jimTreeNodeState === undefined) {
            jimData.jimTreeNodeState = {};
          }

          if(jimData.jimTreeNodeState[page] === undefined) {
            jimData.jimTreeNodeState[page] = {closedNodes: [], openNodes: []};
          }

          jimData.jimTreeNodeState[page].closedNodes = [];
          $treeList.find("li.closed").each(function(i) { 
            if(this.id !== "" || this.id !== undefined) {
              jimData.jimTreeNodeState[page].closedNodes[i] = this.id;
            } 
          });
          jimData.jimTreeNodeState[page].openNodes = [];               
          $treeList.find("li.open").each(function(i) {
            if(this.id !== "" || this.id !== undefined) {
              jimData.jimTreeNodeState[page].openNodes[i] = this.id;
            }
          });
        }
      });
    }

    var $treeList = $(this);

    var opts = $.extend({}, $.fn.jimTree.defaults, options);

    var page = jQuery($treeList[0]).jimGetCanvasName();

    if (opts.persistNodeState) {
      addUnloadEvent();
    }

    return $treeList.each(function(i, tree) {
      buildTree(tree);
      addEvents(tree);
    });

  };

  /* public plugin defaults */
  $.fn.jimTree.defaults = {
      persistNodeState: true
  };

  /* public tree update function */
  $.fn.jimTree.update = function(tree) {

    var $tree = $(tree);
    $tree.find("li:last-child").addClass("last");
    $tree.children("li:visible:last").addClass("last");

    visiblelis = $tree.children("li:visible");
    visiblelis.each(function(i, element){
      if(i < visiblelis.length - 1){
        jQuery(element).removeClass("last");
      }   
    });

    $tree.find("li:has(ul)").not(".open").addClass("closed");
    $tree.find("li").not(".open").not(".closed").addClass("leaf");

    checkEmptyNodes($tree, "open");
    checkEmptyNodes($tree, "closed");
  };

})(jQuery);