export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl text-blue-500">Profile {params.id}</h1>
    </div>
  );
}
