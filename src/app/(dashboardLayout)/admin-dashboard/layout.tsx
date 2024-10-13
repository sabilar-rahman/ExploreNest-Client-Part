import AdminLayout from "./layout/adminDashboardLayout";

const AdminDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
};

export default AdminDashboardLayout;
