"use strict";
$(document).ready(function () {
    onPageLoading();


/*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
// Khai báo biến toàn cục để lưu thông tin ng dùng chọn combo menu
var gCOMBO_MENU = [];


// Khai báo biến toàn cục để lưu thông tin ng dùng chọn loại pizza
var gSELECTED_PIZZA = [];

// Khai báo biến chứa phần trăm giảm giá
var gPHAN_TRAM_GIAM_GIA = 0;

// Khai báo biến chứa voucher id
var gID_VOUCHER = 0;

// Khai báo biến toàn cục để lưu thông tin đơn hàng người dùng chọn
var gORDER_STRUCTURE = {
        pizzaSize: "", // S, M, L
        duongKinh: "",
        suon: "",
        salad: "",
        soLuongNuoc: "",
        priceVND: "",
        pizzaType: "", // seafood, hawaii, bacon
        idLoaiNuocUong: -1, // value của danh sách đồ uống
        tenNuocUong: "", // text của danh sách đồ uống
        idVourcher: 0, // Lấy từ input để gọi API
        fullName: "",
        email: "",
        phone: "",
        address: "",
        loiNhan: "",
        giamGia: "",
        thanhTien: "",
        status: "open",
                priceActualVND () {
                    var vResult = gCOMBO_MENU.price * (1 - gPHAN_TRAM_GIAM_GIA / 100);
                    gORDER_STRUCTURE.thanhTien = vResult;
                    return vResult;
                }
};





/*** REGION 2 - Vùng gán / thực thi hàm xử lý sự kiện cho các elements */
//*** COMBO MENU
// Gán sự kiện cho từng nút chọn trong combo menu để lưu lại thông tin 
// Small menu
$("#btn-small-click").on("click", function () {
    onBtnSmallComboMenuClick();
});

// Medium menu
$("#btn-medium-click").on("click", function () {
    onBtnMediumComboMenuClick();
});

// Large menu
$("#btn-large-click").on("click", function () {
    onBtnLargeComboMenuClick();
});


// Modal
// Gán sự kiện cho nút tạo đơn (trong modal)
$("#btn-create-order").on("click", function () {
    onBtnCreateOrderClick();
});



//*** PIZZA SELECTED
// Gán sự kiện cho từng nút chọn trong chọn loại pizza để lưu lại thông tin 
// Seafood
$("#btn-chon-seafood").on("click", function () {
    onBtnSelectedSeafood();
});

// Hawaii
$("#btn-chon-hawaii").on("click", function () {
    onBtnSelectedHawaii();
});

// Bacon
$("#btn-chon-bacon").on("click", function () {
    onBtnSelectedBacon();
});


//**GỬI ĐƠN */
$("#btn-gui-don").on("click", function () {
    onBtnSendOrder();
});




/*** REGION 3 - Event handlers - Vùng khai báo các hàm xử lý sự kiện */  
// Xử lý hàm onload
function onPageLoading() {
    console.log("Test hàm onload tại đây");
    //** Select drinks */
    // Đổ dữ liệu vào select drink
    requestToApiGetDrinkList();

};

//*** COMBO MENU
// Hàm xử lý sự kiện cho từng nút chọn trong combo menu để lưu lại thông tin 
// Small menu
function onBtnSmallComboMenuClick() {
    console.log("Nút chọn small menu combo được click");
    var vSmallComboMenu = getComboMenu ("Small", 20, 2, 200, 2, 150000);
    // Hiển thị ra console log khi người dùng chọn
    vSmallComboMenu.displayToConsoleLog();
    // Đổi màu nút chọn
    changeButtonMenuColor(vSmallComboMenu);
    // Gán giá trị vào biến toàn cục
    gCOMBO_MENU = vSmallComboMenu;
    console.log("gCOMBO_MENU:");
    console.log(gCOMBO_MENU);

};

// Medium menu
function onBtnMediumComboMenuClick() {
    console.log("Nút chọn medium menu combo được click");
    var vMediumComboMenu = getComboMenu ("Medium", 25, 4, 300, 3, 200000);
    // Hiển thị ra console log khi người dùng chọn
    vMediumComboMenu.displayToConsoleLog();
    // Đổi màu nút chọn
    changeButtonMenuColor(vMediumComboMenu);
    // Gán giá trị vào biến toàn cục
    gCOMBO_MENU = vMediumComboMenu;
    console.log("gCOMBO_MENU:");
    console.log(gCOMBO_MENU);
};

// Large menu
function onBtnLargeComboMenuClick() {
    console.log("Nút chọn large menu combo được click");
    var vLargeComboMenu = getComboMenu ("Large", 30, 8, 500, 4, 250000);
    // Hiển thị ra console log khi người dùng chọn
    vLargeComboMenu.displayToConsoleLog();
    // Đổi màu nút chọn
    changeButtonMenuColor(vLargeComboMenu);
    // Gán giá trị vào biến toàn cục
    gCOMBO_MENU = vLargeComboMenu;
    console.log("gCOMBO_MENU:");
    console.log(gCOMBO_MENU);
};

//*** PIZZA SELECTED
// Hàm xử lý sự kiện cho từng nút chọn trong chọn loại pizza để lưu lại thông tin 
// Seafood
function onBtnSelectedSeafood() {
    console.log("Nút chọn seafood được click");
    var vSeafoodPizza = getSelectedPizza("Seafood");
    // Đổi màu nút
    changeButtonSelectedPizzaColor(vSeafoodPizza);
    // Gán giá trị vào biến toàn cục
    gSELECTED_PIZZA = vSeafoodPizza;
    console.log("gSELECTED_PIZZA:");
    console.log(gSELECTED_PIZZA);
};

// Hawaii
function onBtnSelectedHawaii() {
    console.log("Nút chọn hawaii được click");
    var vHawaiiPizza = getSelectedPizza("Hawaii");
    // Đổi màu nút
    changeButtonSelectedPizzaColor(vHawaiiPizza);
    // Gán giá trị vào biến toàn cục
    gSELECTED_PIZZA = vHawaiiPizza;
    console.log("gSELECTED_PIZZA:");
    console.log(gSELECTED_PIZZA);
};

// Bacon
function onBtnSelectedBacon() {
    console.log("Nút chọn bacon được click");
    var vBaconPizza = getSelectedPizza("Bacon");
    // Đổi màu nút
    changeButtonSelectedPizzaColor(vBaconPizza);
    // Gán giá trị vào biến toàn cục
    gSELECTED_PIZZA = vBaconPizza;
    console.log("gSELECTED_PIZZA:");
    console.log(gSELECTED_PIZZA);
};


//*** GỬI ĐƠN */
// Hàm xử lý sự kiện gửi đơn hàng
function onBtnSendOrder() {
    //B1: Thu thập dữ liệu
    getOrderForm(gORDER_STRUCTURE);
    console.log("%c gORDER_STRUCTURE", "color:aqua");
    console.log(gORDER_STRUCTURE);
    //B2: Validate dữ liệu
    var vLegalOrderForm = validateOrderForm(gORDER_STRUCTURE);
    if (vLegalOrderForm) {
    console.log(vLegalOrderForm);
        if (gORDER_STRUCTURE.idVourcher != "") { // Nếu người dùng có nhập mã voucher
            //B3: Gọi API để lấy thông tin về idVourcher 
            requestToGetVoucherId(gORDER_STRUCTURE.idVourcher);
            // Hiển thị ra console log thông tin order để kiểm tra
            displayOrderStructureToConsoleLog(gORDER_STRUCTURE);
            //B4: Hiển thị ra modal thông tin order
            displayOrderDetailToModal(gORDER_STRUCTURE);
        } else {
            gPHAN_TRAM_GIAM_GIA = 0;
            displayOrderStructureToConsoleLog(gORDER_STRUCTURE);
            displayOrderDetailToModal(gORDER_STRUCTURE);
        }
    }

};

    
//***MODAL */
// Hàm xử lý sự kiện cho nút tạo đơn (trong modal)
function onBtnCreateOrderClick() {
    // // Ẩn modal tạo đơn
    $("#order-detail-modal").modal("hide");
    // Gọi API, method POST
    requestToApiUpdateOrder(gORDER_STRUCTURE);
    // Hiển thị modal mã đơn hàng
    $("#create-order-modal").modal("show");
};





/*** REGION 4 - Common funtions - Vùng khai báo hàm dùng chung trong toàn bộ chương trình*/
//*** COMBO MENU */
// Khai báo hàm xử lý sự kiện cho nút chọn
function getComboMenu (paramPlan, paramDuongKinh, paramSuon, paramSalad, paramNuocNgot, paramPrice) {
    var vSelectedMenu = {
            plan: paramPlan,
            duongKinh: paramDuongKinh,
            suon: paramSuon,
            salad: paramSalad,
            nuocNgot: paramNuocNgot,
            price: paramPrice,
                displayToConsoleLog() {
                    console.log("%c Menu được chọn là: " + vSelectedMenu.plan, "color:violet");
                    console.log("Đường kính Pizza: " + vSelectedMenu.duongKinh);
                    console.log("Sườn: " + vSelectedMenu.suon);
                    console.log("Salad: " + vSelectedMenu.salad);
                    console.log("Số lượng nước ngọt: " + vSelectedMenu.nuocNgot);
                    console.log("Giá: " + vSelectedMenu.price);
                }
    }
    return vSelectedMenu;
};
// Đổi màu nút chọn được click
function changeButtonMenuColor(paramComboMenu) {
    if (paramComboMenu.plan == "Small") {
        $("#btn-small-click").addClass("btn-success");
        $("#btn-medium-click, #btn-large-click").removeClass("web-button btn-success").addClass("web-button");
    }
    if (paramComboMenu.plan == "Medium") {
        $("#btn-small-click, #btn-large-click").removeClass("web-button btn-success").addClass("web-button");
        $("#btn-medium-click").addClass("btn-success");
    }
    if (paramComboMenu.plan == "Large") {
        $("#btn-small-click, #btn-medium-click").removeClass("web-button btn-success").addClass("web-button");
        $("#btn-large-click").addClass("btn-success");
    }
};

//*** PIZZA SELECTED
// Khai báo hàm xử lý sự kiện cho từng nút chọn trong chọn loại pizza để lưu lại thông tin 
function getSelectedPizza(paramPizzaType) {
    var vSeafood = paramPizzaType;
    console.log("%c Loại pizza được chọn: " + vSeafood, "color:yellow");
    return vSeafood;
};

// Đổi màu nút chọn
function changeButtonSelectedPizzaColor(paramPizzaType) {
    if (paramPizzaType == "Seafood") {
        $("#btn-chon-seafood").addClass("btn-success");
        $("#btn-chon-hawaii, #btn-chon-bacon").removeClass("web-button btn-success").addClass("web-button");
    }
    if (paramPizzaType == "Hawaii") {
        $("#btn-chon-hawaii").addClass("btn-success");
        $("#btn-chon-seafood, #btn-chon-bacon").removeClass("web-button btn-success").addClass("web-button");
    }
    if (paramPizzaType == "Bacon") {
        $("#btn-chon-bacon").addClass("btn-success");
        $("#btn-chon-seafood, #btn-chon-hawaii").removeClass("web-button btn-success").addClass("web-button");
    }
};

//** DRINK LIST */
// Khai báo hàm gọi API, method GET
function requestToApiGetDrinkList() {
    const vBaseUrl = "/devcamp-pizza365/drinks";
    $.ajax({
        url: vBaseUrl,
        type: "GET",
        dataType: "json",
        //async: false,
            success: function (paramResObj) {
                console.log(">>>>> Danh sách các loại đồ uống:");
                console.log(paramResObj);
                loadToSelecDrink(paramResObj);
            },
            error: function (ajaxContext) {
                alert(ajaxContext.responseText);
            }
    });
};

// Khai báo hàm đổ dữ liệu vào select drinks
function loadToSelecDrink(paramResObj) {
    var vSelectDrinkElement = $("#select-drink-list");
    for (var bI = 0; bI < paramResObj.drinks.length; bI++) {
        var bResult = paramResObj.drinks[bI];
        $("<option>", {
            value: bResult.maNuocUong,
            text: bResult.tenNuocUong
        }).appendTo(vSelectDrinkElement);
    }

};

//*** NÚT GỬI ĐƠN */
// Thu thập dữ liệu từ các trường input
function getOrderForm(paramORDER_STRUCTURE) {
    paramORDER_STRUCTURE.fullName = $("#inp-name").val().trim();
    paramORDER_STRUCTURE.email = $("#inp-email").val().trim();
    paramORDER_STRUCTURE.phone = $("#inp-phone-number").val().trim();
    paramORDER_STRUCTURE.address = $("#inp-address").val().trim();
    paramORDER_STRUCTURE.loiNhan = $("#inp-message").val().trim();

    paramORDER_STRUCTURE.pizzaSize = gCOMBO_MENU.plan;
    paramORDER_STRUCTURE.duongKinh = gCOMBO_MENU.duongKinh;
    paramORDER_STRUCTURE.suon = gCOMBO_MENU.suon;
    paramORDER_STRUCTURE.salad = gCOMBO_MENU.salad;
    paramORDER_STRUCTURE.soLuongNuoc = gCOMBO_MENU.nuocNgot;

    paramORDER_STRUCTURE.pizzaType = gSELECTED_PIZZA;
    paramORDER_STRUCTURE.idLoaiNuocUong = $("#select-drink-list").val();
    paramORDER_STRUCTURE.tenNuocUong = $("#select-drink-list option:selected").text(); // nếu người dùng có nhập
    paramORDER_STRUCTURE.idVourcher = $("#inp-voucher-id").val().trim();
    paramORDER_STRUCTURE.giamGia = gPHAN_TRAM_GIAM_GIA;
    paramORDER_STRUCTURE.priceVND = gCOMBO_MENU.price;
    paramORDER_STRUCTURE.thanhTien = paramORDER_STRUCTURE.priceActualVND();
};

// Validate dữ liệu
function validateOrderForm(paramORDER_STRUCTURE) {
    if (paramORDER_STRUCTURE.pizzaSize == null) {
        alert("Bạn chưa chọn size pizza");
        return false;        
    }
    if (paramORDER_STRUCTURE.pizzaType == "") {
        alert("Bạn chưa chọn loại pizza");
        return false;        
    }
    if (paramORDER_STRUCTURE.idLoaiNuocUong == "0") {
        alert("Bạn chưa chọn đồ uống");
        return false;        
    }
    if (paramORDER_STRUCTURE.fullName == "") {
        alert("Bạn chưa nhập tên");
        $("#inp-name").focus();
        return false;        
    }
    if (paramORDER_STRUCTURE.email == "") {
        alert("Bạn chưa nhập email");
        $("#inp-email").focus();
        return false;   
    }
    if (!paramORDER_STRUCTURE.email.includes("@")) {
        alert("Email không hợp lệ");
        $("#inp-email").focus();
        return false;
    }
    if (paramORDER_STRUCTURE.phone == "") {
        alert("Bạn chưa nhập số điện thoại");
        $("#inp-phone-number").focus();
        return false;
    }
    if (isNaN(paramORDER_STRUCTURE.phone)) {
        alert("Số điện thoại phải là số");
        $("#inp-phone-number").focus();
        return false;
    }
    if (paramORDER_STRUCTURE.address == "") {
        alert("Bạn chưa nhập địa chỉ");
        $("#inp-address").focus();
        return false;
    }
    return true;
};

// Gọi API, lấy thông tin voucher Id
function requestToGetVoucherId(paramORDER_STRUCTURE) {
    const vBaseVoucherId = "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/";
    $.ajax({
        url: vBaseVoucherId + paramORDER_STRUCTURE,
        type: "GET",
        // async: false,
        dataType: "json",
            success: function (paramResObj) {
                console.log("Mã Voucher hợp lệ:");
                console.log(paramResObj);
                // lấy giá trị phần trăm giảm giá để gán vào biến toàn cục
                gPHAN_TRAM_GIAM_GIA = paramResObj.phanTramGiamGia;
                // paramORDER_STRUCTURE.giamGia = gPHAN_TRAM_GIAM_GIA;
                gID_VOUCHER = paramResObj.id; // lưu lại id của voucher vào biến toàn cục
                console.log("Phần trăm giảm giá: " + gPHAN_TRAM_GIAM_GIA + " %");
                console.log("ID của Voucher: " + gID_VOUCHER);
            },
            error: function (ajaxContext) {
                alert(ajaxContext.responseText);
            }   
    });
};

// Khai báo hàm hiển thị ra console log để kiểm tra
function displayOrderStructureToConsoleLog(paramORDER_STRUCTURE) {
    console.log("%c Thông tin chi tiết order:", "color:orange");

    console.log("Tên: " + paramORDER_STRUCTURE.fullName);
    console.log("Email: " + paramORDER_STRUCTURE.email);
    console.log("Số điện thoại: " + paramORDER_STRUCTURE.phone);
    console.log("Địa chỉ: " + paramORDER_STRUCTURE.address);
    console.log("Lời nhắn: " + paramORDER_STRUCTURE.loiNhan);
    
    console.log("Menu: " + paramORDER_STRUCTURE.pizzaSize);
    console.log("Đường kính: " + paramORDER_STRUCTURE.duongKinh + " cm");
    console.log("Sườn: " + paramORDER_STRUCTURE.suon);
    console.log("Salad: " + paramORDER_STRUCTURE.salad + "gr");
    console.log("Loại nước uống: " + paramORDER_STRUCTURE.tenNuocUong);
    console.log("Số lượng nước: " + paramORDER_STRUCTURE.soLuongNuoc);

    console.log("Loại Pizza: " + gSELECTED_PIZZA);
    console.log("Mã Voucher: " + paramORDER_STRUCTURE.idVourcher);
    console.log("Voucher ID: " + gID_VOUCHER);
    console.log("Giá: " + paramORDER_STRUCTURE.priceVND + " VNĐ");
    console.log("Phần trăm giảm giá: " + gPHAN_TRAM_GIAM_GIA + "%");
    console.log("Phải thanh toán: " + paramORDER_STRUCTURE.priceActualVND() + " VNĐ");
};


// Khai báo hàm hiển thị thông tin ra các trường input trong modal
function displayOrderDetailToModal(paramORDER_STRUCTURE) {
    $("#order-detail-modal").modal("show");
    $("#input-name-modal").val(paramORDER_STRUCTURE.fullName);
    $("#input-phone-number-modal").val(paramORDER_STRUCTURE.phone);
    $("#input-address-modal").val(paramORDER_STRUCTURE.address);
    $("#input-message-modal").val(paramORDER_STRUCTURE.loiNhan);
    $("#input-salad-modal").val(paramORDER_STRUCTURE.salad);
    $("#input-ma-voucher-modal").val(paramORDER_STRUCTURE.idVourcher);

    $("#input-order-detail-modal").val(
        "Xác nhận: " + paramORDER_STRUCTURE.fullName + ", địa chỉ:" + paramORDER_STRUCTURE.address + "." + '\r\n' +
        "Menu: " + paramORDER_STRUCTURE.pizzaSize + ", đường kính: " + paramORDER_STRUCTURE.duongKinh + ", sườn nướng: " + paramORDER_STRUCTURE.suon + ", nước: " + 
        paramORDER_STRUCTURE.tenNuocUong + ", số lượng nước: " + paramORDER_STRUCTURE.soLuongNuoc + ", salad: " + paramORDER_STRUCTURE.salad + "." + '\r\n' +
        "Loại pizza: " + gSELECTED_PIZZA + ", Giá: " + paramORDER_STRUCTURE.priceVND + " VNĐ" + ", Mã Giảm giá: " + paramORDER_STRUCTURE.idVourcher + "." + '\r\n' +
        "Phần trăm giảm giá: " + gPHAN_TRAM_GIAM_GIA + "%." + '\r\n' +
        "Phải thanh toán: " + paramORDER_STRUCTURE.priceActualVND() + " VNĐ."
    );
};


//*** MODAL */
// Khai báo hàm gọi API
function requestToApiUpdateOrder(paramORDER_STRUCTURE) {
    const gBaseUrlUpdateOrder = "/devcamp-pizza365/orders";
    $.ajax({
        url: gBaseUrlUpdateOrder,
        type: "POST",
        dataType: "json",
        data: JSON.stringify(paramORDER_STRUCTURE),
        // async: false,
        contentType: "application/json",
            success: function (paramResObj) {
                console.log("%c Thông tin update order:", "color:yellow");
                console.log(paramResObj);

                loadToInputOrderId(paramResObj);
            },
            error: function (ajaxContext) {
                alert(ajaxContext.responseText);
                window.location.href = "index.html";
            }
    });
};

// Khai báo hàm hiển thị mã đơn hàng vào ô input
function loadToInputOrderId(paramResObj) {
    $("#input-ma-don-hang-modal").val(paramResObj.data.orderCode);
};



});