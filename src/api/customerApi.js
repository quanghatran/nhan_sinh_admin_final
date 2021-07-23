import axiosAdmin from "./axiosAdmin";

const customerApi = {
	getListUsers: (params) => {
		const url = "/api/users";
		return axiosAdmin.get(url, params);
	},
	patchMoney: (subApi, params) => {
		const url = `/api/users/${subApi}`;
		return axiosAdmin.patch(url, params);
	},
	getListServerUserBought: (subApi, params) => {
		const url = `/api/user-service/${subApi}`;
		return axiosAdmin.get(url, params);
	},
};

export default customerApi;
