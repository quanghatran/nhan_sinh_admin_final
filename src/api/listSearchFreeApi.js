import axiosAdmin from "./axiosAdmin";

const listSearchFreeApi = {
	// post phone and password, received a token, save in local storage
	// const header
	getListSearchFree: (params) => {
		const url = "/api/searchFree";

		return axiosAdmin.get(url, params);
	},
};

export default listSearchFreeApi;
