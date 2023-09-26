import { v4 as uuid } from "uuid";
import { promises as fs } from "fs";

class PostService {
    readAndParseFile = async () => {
        try {
            const data = await fs.readFile("./data/posts.json", "utf-8");
            const parsedData = JSON.parse(data);
            return parsedData.posts;
        } catch (err) {
            return err;
        }
    };

    async getAllPosts() {
        return await this.readAndParseFile();
    }

    async getPostById(postId) {
        const posts = this.readAndParseFile();
        return await posts[postId];
    }
}

export const postService = new PostService();
