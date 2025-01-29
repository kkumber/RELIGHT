const ErrorMsg = ({ error }: any) => {
  return (
    <div className="text-red-600 bg-gray-100 p-4 rounded-lg">
      Error: {error}
    </div>
  );
};

export default ErrorMsg;
