import { useRouteError } from "react-router-dom";
function ErrorPage() {
  let error = useRouteError();
  return (
    <div>
      <h3 className="text-danger text-center">{error.statusText}</h3>
    </div>
  );
}

export default ErrorPage;
