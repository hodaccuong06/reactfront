import { orderContant } from "./contant";

export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const renderOptions = (arr) => {
    let results = []
    if(arr) {
        results = arr?.map((opt) => {
            return {
                value: opt,
                label: opt
            }
        })
    }
    results.push({
        label: 'Thêm type',
        value: 'add_type'
    })
    return results
}

export const convertPrice = (price) => {
    try {
        const result  = price?.toLocaleString().replaceAll(',', '.')
        return `${result} VND`
    } catch (error) {
        return null
    }
}

export const convertDataChart = (data, type) => {
    try {
        const object = {}
        Array.isArray(data) && data.forEach((opt) => {
            if(!object[opt[type]]) {
                object[opt[type]] = 1
            } else {
                object[opt[type]]+=1
                console.log('c;getBase64', object[opt[type]], typeof(object[opt[type]]))
            }
        })
        const results = Array.isArray(Object.keys(object)) && Object.keys(object).map((item) => {
            return {
                name: orderContant.payment[item],
                value: object[item]
            }
        })
        return results
    }catch(e) {
        return []
    }
  }
  
// doanh thu ngày hôm nay và ngày tiếp theo
export const convertDataChart1 = (data, type) => {
    try {
      const object = {};
      //lặp qua từng giao dịch
      data.forEach((opt) => {
        console.log('opt', opt)
        const currentDate = new Date(opt[type]).toLocaleDateString(); //lấy ngày từ ngày tạo ra giao dịch
        if (!object[currentDate]) {
          //nếu ngày hiện tại chưa tồn tại trong object, thêm vào với doanh thu là giá trị của giao dịch hiện tại
          object[currentDate] = opt.totalPrice;
        } else {
          //nếu ngày hiện tại đã tồn tại trong object, cộng thêm vào doanh thu của giao dịch hiện tại
          object[currentDate] += opt.totalPrice;
        }
      });
  
      const results = Object.keys(object).map((date) => ({
        name: date, //tên là ngày hoặc khoảng thời gian giữa hai ngày
        Doanh_Thu: object[date], //doanh thu của ngày tiếp theo
      }));
      return results;
    } catch (e) {
      return [];
    }
  };

