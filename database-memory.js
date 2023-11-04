import { randomUUID } from 'crypto';

export class DatabaseMemory {
    #videos = new Map();

    async list(search) {
        let videos = [...this.#videos.values()];

        if (search) {
            videos = videos.filter(video => video.title.includes(search));
        }

        return videos;
    }

    async create(video) {
        const videoId = randomUUID();
        const { title, description, duration } = video;
        const newVideo = { id: videoId, title, description, duration };
        this.#videos.set(videoId, newVideo);
        return newVideo;
    }

    async update(id, video) {
        if (this.#videos.has(id)) {
            const { title, description, duration } = video;
            this.#videos.set(id, { id, title, description, duration });
            return true;
        } else {
            return false;
        }
    }

    async delete(id) {
        const deleted = this.#videos.delete(id);
        return deleted;
    }
}
