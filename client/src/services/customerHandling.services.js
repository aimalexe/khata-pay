import API from "@/app/api/axios.js";
import { notifications } from '@mantine/notifications';

export const showCustomerAddedToast = (name) => {
  notifications.show({
    title: 'Customer Added',
    message: `${name} has been added successfully.`,
    color: 'green',
    autoClose: 3000,
    withCloseButton: true,
    style: { fontWeight: 500 },
  });
};

export const showCustomerUpdatedToast = (name) => {
  notifications.show({
    title: 'Customer Updated',
    message: `${name}'s information has been updated.`,
    color: 'yellow',
    autoClose: 3000,
    withCloseButton: true,
    style: { fontWeight: 500 },
  });
};

export const showCustomerDeletedToast = (name) => {
  notifications.show({
    title: 'Customer Deleted',
    message: `${name} has been deleted successfully.`,
    color: 'red',
    autoClose: 3000,
    withCloseButton: true,
    style: { fontWeight: 500 },
  });
};

export const getCustomersFromAPI = async (setCustomers) => {
  const token = localStorage.getItem("token");
  try {

    const res = await API.get('/api/customers',{
      headers: { Authorization: `Bearer ${token}` },
    });
    setCustomers(res.data);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
};

export const deleteCustomerById = async (id, setCustomers, name) => {
  const token = localStorage.getItem("token");
  try {
    await API.delete(`/api/customers/${id}`,{
      headers: { Authorization: `Bearer ${token}` },
    });
    getCustomersFromAPI(setCustomers);
    showCustomerDeletedToast(name);
  } catch (err) {
    console.error("Delete failed:", err);
  }
};

export const updateCustomerById = async (updatedCustomer, setCustomers, onSuccess) => {
  const token = localStorage.getItem("token");
  try {
    await API.put(`/api/customers/${updatedCustomer.id}`, updatedCustomer,{
      headers: { Authorization: `Bearer ${token}` },
    });
    getCustomersFromAPI(setCustomers);
    onSuccess();
  } catch (err) {
    console.error("Update failed:", err);
  }
};

export const createCustomer = async (newCustomer, setCustomers, onSuccess) => {
  const token = localStorage.getItem("token");
  try {
    await API.post(`/api/customers`, newCustomer,{
      headers: { Authorization: `Bearer ${token}` },
    });
    getCustomersFromAPI(setCustomers);
    onSuccess();
  } catch (err) {
    console.error("Create failed:", err);
  }
};

export const addTransactionForCustomer = async (customerId, cashIn, cashOut, setCustomers, onSuccess) => {
  const token = localStorage.getItem("token");
  try {
    await API.post(
      `/api/transactions`,
      { fk_customer_id: customerId, cashIn, cashOut },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    getCustomersFromAPI(setCustomers);
    if (onSuccess) onSuccess();
  } catch (err) {
    console.error("Add transaction failed:", err);
  }
};

export const getCustomerWithTransactions = async (customerId) => {
  const token = localStorage.getItem("token");
  try {
    const res = await API.get(`/api/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Fetch customer with transactions failed:", err);
    throw err;
  }
};
