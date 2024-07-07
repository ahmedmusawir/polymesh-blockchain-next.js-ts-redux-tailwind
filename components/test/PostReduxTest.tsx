import { useGetAssetsQuery } from "@/features/polymesh/apiPolymesh";
import { useGetPostsQuery } from "@/features/posts/apiPosts";

const PostReduxTest = () => {
  const { data, error, isLoading } = useGetPostsQuery({});
  const { data: assets, isFetching: isFetchingAssets } = useGetAssetsQuery();

  console.log("Assets:", assets);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.posts?.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <h1>Assets</h1>
      {/* <ul>
        {assets?.map((asset: any) => (
          <li key={asset.id}>{asset.name}</li> // Adapt the key and name according to the actual asset properties
        ))}
      </ul> */}
    </div>
  );
};

export default PostReduxTest;
