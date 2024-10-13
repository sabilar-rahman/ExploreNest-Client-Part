import { Card, Avatar } from "@nextui-org/react";

const Comment = ({ comment }: { comment: any }) => {
  return (
    <Card className="my-4 p-4" shadow="md">
      <div className="flex items-center mb-3">
        <Avatar
          alt={comment.user}
          className="mr-4"
          size="lg"
          src={comment.userProfile}
        />
        <div>
          <span>{comment.user}</span>
          <span className="text-gray-500">
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <span>{comment.text}</span>
    </Card>
  );
};

export default Comment;