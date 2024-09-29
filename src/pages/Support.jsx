import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";

const Support = () => {
  const personalInfo = {
    name: "Tejas Gawade",
    email: "tgawade092@gmail.com",
  };
  const links = [
    { name: "Twitter", icon: FaTwitter, url: "https://x.com/Tejas9_" },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/tejas-gawade-97t",
    },
    { name: "GitHub", icon: FaGithub, url: "https://github.com/tejasg99" },
    {
      name: "Discord",
      icon: FaDiscord,
      url: "https://discord.com/users/tejas9_.",
    },
  ];

  return (
    <section className="w-full h-[100%]  flex justify-start items-center">
      <div className="bg-transparent text-white p-8 rounded-lg shadow-lg w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-600 p-4 rounded-full mb-4">
            <BiSupport className="text-4xl" />
          </div>

          <h3 className="text-2xl font-bold text-center mb-2">
            Contact us for any issues
          </h3>
          <h4 className="text-2xl font-bold text-center mb-2 ">
            Owner: {personalInfo.name}
          </h4>
          <div className="flex gap-3 items-center border border-slate-500 rounded-lg px-4 py-2 mt-2">
            <IoIosMail  className="text-white w-8 h-8" />
            <p className="text-blue-400 text-2xl">{personalInfo.email}</p> 
          </div>
        </div>
        <div className="flex justify-center items-center gap-6">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-transparent border border-slate-500 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <link.icon className="text-blue-400 mr-3 text-xl" />
              <span className="text-lg">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;
