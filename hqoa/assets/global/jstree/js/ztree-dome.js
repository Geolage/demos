var setting = {
    view: {
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        selectedMulti: false,
        showIcon: false
    },
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    edit: {
        enable: true
    }
};

var zNodes =[
    { id:1, pId:0, name:"有机大米类", open:true},
    { id:11, pId:1, name:"安徽有机大米"},
    { id:12, pId:1, name:"东北一等大米"},
    { id:13, pId:1, name:"是否是父节点"},
    { id:2, pId:0, name:"有机面粉系列", open:true},
    { id:21, pId:2, name:"安徽东乡面粉"},
    { id:22, pId:2, name:"东北优良面粉"},
    { id:23, pId:2, name:"宁夏宁南面粉"},
];

$(document).ready(function(){
    $.fn.zTree.init($("#treeDemo"), setting, zNodes);
});

var newCount = 1;
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_span");
    if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
    var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
        + "' title='添加分类' onfocus='this.blur();'></span>";
    sObj.after(addStr);
    var btn = $("#addBtn_"+treeNode.tId);
    if (btn) btn.bind("click", function(){
        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
        zTree.addNodes(treeNode, {id:(100 + newCount), pId:treeNode.id, name:"new node" + (newCount++)});
        return false;
    });
};
function removeHoverDom(treeId, treeNode) {
    $("#addBtn_"+treeNode.tId).unbind().remove();
};