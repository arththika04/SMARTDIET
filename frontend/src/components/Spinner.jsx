import "./spinner.css";

export default function Spinner({ size = 22 }) {
  return <span className="spinner" style={{ width: size, height: size }} />;
}