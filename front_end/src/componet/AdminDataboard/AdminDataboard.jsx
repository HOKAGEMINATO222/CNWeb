import React, { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Spin } from "antd";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import apiService from "../../api/api";

const AdminDataboard = () => {
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    productCategories: [],
    revenueByMonth: [],
    orderStatuses: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch users
        const users = await apiService.getAllUsers();
        setUserCount(users.data.users.length || 0);

        // Fetch products
        const products = await apiService.getProducts();
        setProductCount(products.data.products.length || 0);

        const userIds = users.data.users.map((user) => user._id);

        // Fetch orders for each user
        const ordersRequests = userIds.map((userId) => apiService.getUserOrders(userId));
        const resolvedOrders = await Promise.allSettled(ordersRequests);

        // Filter for successful responses
        const orders = resolvedOrders
          .filter((result) => result.status === "fulfilled")
          .flatMap((result) => result.value.data);

        // Flatten the orders and calculate stats
        const allOrders = orders.reduce((acc, orderData) => {
          if (Array.isArray(orderData.orders)) {
            return acc.concat(orderData.orders); // Flatten the orders arrays
          }
          return acc;
        }, []);

        const totalRevenue = allOrders.filter((order) => order.orderStatus === "Delivered")
          .reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        // Product category distribution
        const productCategories = products.data.products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});

        // Revenue by month
        const revenueByMonth = allOrders.reduce((acc, order) => {
          const orderDate = new Date(order.createdAt);
          const monthKey = `${orderDate.getMonth() + 1}-${orderDate.getFullYear()}`;
          if (order.orderStatus === "Delivered") {
            acc[monthKey] = (acc[monthKey] || 0) + order.totalAmount;
          }
          return acc;
        }, {});

        const formattedRevenueByMonth = Object.keys(revenueByMonth).map((month) => ({
          month,
          revenue: revenueByMonth[month],
        }));

        // Order status distribution
        const orderStatuses = allOrders.reduce((acc, order) => {
          acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
          return acc;
        }, {});

        setOrderStats({
          totalOrders: allOrders.length || 0,
          totalRevenue,
          productCategories,
          revenueByMonth: formattedRevenueByMonth,
          orderStatuses,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  const productCategoryData = Object.keys(orderStats.productCategories).map((category) => ({
    name: category,
    value: orderStats.productCategories[category],
  }));

  const revenueByMonthData = orderStats.revenueByMonth;

  // Order Status Pie Chart Data
  const orderStatusData = Object.keys(orderStats.orderStatuses).map((status) => ({
    name: status,
    value: orderStats.orderStatuses[status],
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bảng điều khiển quản trị</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số người dùng"
              value={userCount}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số sản phẩm"
              value={productCount}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng số đơn hàng"
              value={orderStats.totalOrders}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng doanh thu"
              value={orderStats.totalRevenue}
              prefix="VND"
              valueStyle={{ color: "#d48806" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Phân phối các loại mặt hàng">
            <PieChart width={400} height={350}>
              <Pie
                data={productCategoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {productCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#81c784", "#64b5f6", "#ffb74d", "#ff8a65", "#a5d6a7", "#E1BEE7", "#FFEB3B", "#4CAF50", "#81D4FA"][index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Phân phối trạng thái đơn hàng">
            <PieChart width={400} height={350}>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {orderStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#81c784", "#f44336", "#ffeb3b", "#1976d2"][index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="Doanh thu theo tháng">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueByMonthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDataboard;
