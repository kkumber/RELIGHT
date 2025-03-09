const ErrorMsg = ({ error }: any) => {
  return (
    <div className="text-red-600 p-8 rounded-lg bg-red-100">Error: {error}</div>
  );
};

export default ErrorMsg;
