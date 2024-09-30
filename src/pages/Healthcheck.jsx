import { useHealthcheck } from "../hooks/healthcheck.hook";

function Healthcheck() {
    const { data: healthcheckMessage } = useHealthcheck();

  return (
    <div className="bg-slate-900 text-white h-screen w-full flex justify-center items-center">
        <h2 className="text-2xl font-semibold">
            { healthcheckMessage }
        </h2>
    </div>
  )
}

export default Healthcheck