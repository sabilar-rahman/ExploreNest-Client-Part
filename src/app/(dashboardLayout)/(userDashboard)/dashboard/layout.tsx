import UserLayout from "./layout/UserDashboardLayout";

const UserDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <UserLayout>{children}</UserLayout>
    </div>
  );
};

export default UserDashboardLayout;
