// import loginApi from "@/api/Login";

export default {
  methods: {
    handleIndex(data) {
      return data.split("-").shift();
    }
  }
};
