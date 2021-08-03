import axiosAdmin from "./axiosAdmin";

const directMeeting = {
	getListDirectMeet: (params) => {
		const url = "/api/admin/gap-truc-tiep";
		return axiosAdmin.get(url, params);
	},
	postNewDirectMeeting: (params) => {
		const url = "/api/admin/gap-truc-tiep";
		return axiosAdmin.post(url, params);
	},
	patchEditNote: (id, params) => {
		const url = `/api/admin/note-gap-truc-tiep/${id}`;
		return axiosAdmin.patch(url, params);
	},
};

export default directMeeting;
