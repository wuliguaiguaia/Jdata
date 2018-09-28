let Mobileoption = ["ipad", "iphone", "andriod", "mobile", ];
let userType;

function testMobile() {
    let str = "";
    let userAgent = navigator.userAgent.toLocaleLowerCase();
    let isMobile = Mobileoption.some((item) => {
        return userAgent.match(item) == item;
    });
    return isMobile;
}
userType = testMobile() == true ? "mobile" : "pc";
if (userType === "mobile") {
    console.log("mobile");
} else {
    console.log("pc");
}