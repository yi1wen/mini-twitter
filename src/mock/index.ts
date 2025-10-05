

export const getTweets = ({page = 0, count = 10}: {page: number, count: number}) => {

    return new Promise((resolve, _) => setTimeout(resolve, 1000)).then(() => 
        Array.from({length: count}, (_, i) => ({
            id: `mock-${page}-${i}`,
            content: `这是第${page}页第${i}条推文`,
            likes: Math.floor(Math.random() * 100),
            isLiked: Math.random() > 0.5,
            avatar: `用户${page}-${i}`,
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)),
        }))
    )
}


export const publishTweet = ({userId, content}: {userId: string, content: string}) => {
    return new Promise((resolve, _) => setTimeout(resolve, 1000)).then(() => ({
        code: 0,
        message: 'success',
        data: {
            id: `${userId}-${Date.now()}`,
            content,
            likes: 0,
            isLiked: false,
            avatar: `用户${userId}`,
            timestamp: new Date(Date.now() - Math.floor(Math.random() * 86400000 * 7)),
        }
    }))
}