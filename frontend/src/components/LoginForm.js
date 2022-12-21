import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/userSlice";

export const LoginForm = () => (
  <>
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      // validationSchema={loginSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
        dispatch(fetchUser(values));
      }}
    >
      <Form>
        <label htmlFor="email">Email</label>
        <Field
          className="mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out"
          id="email"
          type="email"
          name="email"
        />
        <ErrorMessage component="a" className="{styles.errorMsg}" name="email" />
        <label className="{styles.label}" htmlFor="password">
          Password
        </label>
        <Field
          className="mb-4 w-full rounded-md border p-2 text-sm outline-none transition duration-150 ease-in-out"
          id="password"
          type="password"
          name="password"
        />
        <ErrorMessage component="a" className="{styles.errorMsg}" name="password" />
        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            className="rounded border bg-teal-600 py-2 px-4 text-sm text-white transition-all hover:scale-105 hover:bg-teal-700 focus:outline-none"
          >
            Login
          </button>
        </div>
      </Form>
    </Formik>
  </>
);
