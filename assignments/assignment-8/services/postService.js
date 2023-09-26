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

    async writefile(data) {
        try {
            const result = await fs.writeFile(
                "posts.json",
                JSON.stringify({ posts: data })
            );
            return result;
        } catch (error) {
            return error;
        }
    }

    async getAllPosts() {
        return await this.readAndParseFile();
    }

    async getPostById(postId) {
        try {
            const posts = await this.readAndParseFile();
            return posts[postId];
        } catch (error) {
            return error;
        }
    }
    async createAPost(data) {
        try {
            const postsObj = await this.readFile();
            const id = uuid();
            const newPost = {
                id,
                ...data
            };

            postsObj[id] = newPost;

            await this.writefile(postsObj);
            return newPost;
        } catch (error) {
            return error;
        }
    }

    async updateAPostById(postId, data) {
        try {
            const postsObj = await this.readFile();

            if (postsObj.hasOwnProperty(postId)) {
                const updatedPost = {
                    ...postsObj[postId],
                    ...data
                };
                postsObj[postId] = updatedPost;
                await this.writefile(postsObj);
                return updatedPost;
            }
        } catch (error) {
            return error;
        }
    }
    async deleteAPostById(postId) {
        try {
            const postsObj = await this.readFile();
            if (postsObj.hasOwnProperty(postId)) {
                delete postsObj[postId];
                await this.writefile(postsObj);
                return "A Post was deleted";
            }
        } catch (error) {
            return error;
        }
    }
}

export const postService = new PostService();
