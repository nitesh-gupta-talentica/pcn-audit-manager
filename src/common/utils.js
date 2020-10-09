import moment from "moment";
const referenceDate = localStorage.getItem("referenceDate");
export const formatCurrency = (number) => {
  if (number === null) return "";
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
  return formatted.slice(0, -3);
};

export const filterOrdersUpToTime = (orders, timeRange) => {
  let minDate = moment(referenceDate);

  if (timeRange === "all") {
    return orders;
  }
  if (timeRange === "month") {
    minDate = moment(referenceDate).subtract(1, "months");
    return orders.filter(
      (order) => order.time && moment(order.time).isAfter(minDate)
    );
  }
  if (timeRange === "year") {
    minDate = moment(referenceDate).subtract(1, "years");
    return orders.filter(
      (order) => order.time && moment(order.time).isAfter(minDate)
    );
  }
  if (timeRange === "quarter") {
    minDate = moment(referenceDate).subtract(3, "months");
    return orders.filter(
      (order) => order.time && moment(order.time).isAfter(minDate)
    );
  }
  if (timeRange === "week") {
    minDate = moment(referenceDate).subtract(7, "days");
    return orders.filter(
      (order) => order.time && moment(order.time).isAfter(minDate)
    );
  }
};
