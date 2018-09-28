const TYPE = {
    singleLine: {
        caption: "未命名",
        default: "",
        prompt: "",
        setting:{
            sweepYard:"",
            mustWrite: true,
            norepeat:true,
            idVerify:true,
            scopeLimit:true,
            minNum:10,
            maxNum:0,
            customPlan:"",
            widthRatio:1,
            eleHide:true,
            autoComplate:true,
        }
    },
    multiLine: {

    },
    singleSelect: {

    },
    multiSelect: {

    }
};
const TIP = {
    caption: {
        title: "关于字段标题",
        content: "此属性用于告诉填写者应该在该字段中输入什么样的内容。通常是一两个简短的词语，也可以是一个问题。"
    },
    default: {
        title: "设置默认值",
        content: "设置后，此值将作为默认值显示在该字段的输入框中。如果不需要设置默认值，请将此处留空。"
    },
    prompt: {
        title: "关于字段提示",
        content: "此属性用于指定对该字段进行一些附加说明，一般用来指导填写者输入。"
    },
    sweepYard: {
        title: "微信扫码录入",
        content: "在微信中打开时可以使用扫码录入功能，扫码后会自动提取二维码/条形码信息填入字段；在对外查询使用该字段作为查询条件时，也可使用扫码查询。请注意，由于微信安全域名限制，自定义域名表单该功能将失效"
    },
    mustWrite: {
        title: "关于必填校验",
        content: "勾选后，该字段将不允许为空，在字段名称后会有红色的星号标出。如果填写者在提交表单时必填字段没有输入，系统将会给出相关错误提示，表单将无法提交。该属性常用于需要强制填写者必须输入的字段"
    },
    norepeat: {
        title: "关于重复校验",
        content: "勾选后，该字段将不允许提交重复值。填写者在提交表单时，会检测数据库中是否已存在相同的值；如果存在，将给出错误的提示信息，提交将失败。常用于电子邮件，用户名等需要验证填写者身份的字段。"
    },
    idVerify: {
        title: "关于身份证验证",
        content: "此处身份证验证只校验是否符合规定的身份证号格式，无法验证该号码真伪"
    },
    scopeLimit: {
        title: "关于限定范围",
        content: "勾选设置后，填写者只能提交这个列表范围内的数据，这个列表范围外的数据将不能提交表单。通常用于需要限制报名者身份的场景。"
    },
    minNum: {
        title: "关于最少填写字数",
        content: "勾选设置后，系统会限制填写者填写此字段的最小字数。"
    },
    maxNum: {
        title: "关于最多填写字数",
        content: "勾选设置后，系统会限制填写者填写此字段的最大字数。"
    },
    customPlan: {
        title: "设置提交出错时提示",
        content: "勾选后，填表者在提交不符合校验规则的数据时，会显示此处自定义的文案。"
    },
    widthRatio: {
        title: "关于占用整行的宽度",
        content: "你可以定义该字段在填写页面占用的页面宽度为多少"
    },
    eleHide: {
        title: "关于字段隐藏",
        content: "勾选后，该字段只有管理员及数据维护员可见，普通填写者将看不到此字段；通常适用于当你想为已提交数据设置一些特殊属性，如状态（处理/未处理）或优先级（重要/一般）"
    },
    autoComplate: {
        title: "关于缓存填写数据",
        content: "勾选后，填写者第二次打开你的表单时，第一次填写的字段数据将会自动显示出来，减少重复填写。（注：清除浏览器cookie后该功能将会失效）"
    },
    generalField: {
        title: "关于通用字段",
        content: "通用字段提供最基本的表单功能。"
    },
    contactInfo: {
        title: "关于联系信息字段",
        content: "联系信息字段可以让表单获取更多关于填写者的个人信息。"
    },
    goodsOrders: {
        title: "关于商品字段",
        content: "商品字段是金数据为小电商和中小企业定制的一种特殊的字段，它可以让表单具备商品销售功能。",
        link: "查看如何使用商品字段"
    }
};

let toggleObj = [
    ["singleLine", "multiLine"],
    ["singleSelect", "multiSelect", "dropDownList"],
    ["photoSingleSelect", "photoMultiSelect"],
];
let toggleText = [
    ["单行文字", "多行文字"],
    ["单项选择", "多项选择", "下拉框"],
    ["图片单选", "图片多选"],
];