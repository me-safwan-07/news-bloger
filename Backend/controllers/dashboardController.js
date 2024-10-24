
import BlogView from '../models/BlogView.js';

// Get unique view count for a blog post
// export const getSingleNewsViews = async (req, res, next) => {
//     try {
//         const blogId = req.params.id;

//         const uniqueViews = await BlogView.aggregate([
//             { $match: { blogId: mongoose.Types.ObjectId(blogId) } },
//             { $group: { _id: '$ipAddress' } },  // Group by IP address to count unique views
//             { $count: 'uniqueViewCount' }  // Count the number of unique views
//         ]);

//         res.json({ uniqueViews: uniqueViews[0]?.uniqueViewCount || 0 });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error.' });
//     }
// };
