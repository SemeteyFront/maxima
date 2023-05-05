import $api from "../http";

export default class NewsService {
    static async getAllNews() {
        return await $api.get('/news')
    }
}
