import Blog from "../models/Blog";

export const getBlogStats = async (req, res, next) => {
    try {
        // Get total number of posts
        const totalBlogs = await Blog.countDocuments();

        // Get views per blog per month (assuming you have a 'views' field and a 'createdAt' filed)
        const blogViewsPerMonth = await Blog.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                    },
                    totalViwsviews: { $sum: "$views" },
                    totalBlogs: { $sum: 1},
                },
            },
        ]);

        // You can add more aggregations like most popular blog, total views, etc.
        res.json({ totalBlogs, blogViewsPerMonth });
    } catch (err) {
        console.error(err)
        next(err);
    }
}