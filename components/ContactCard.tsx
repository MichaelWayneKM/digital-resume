import { Button } from "@mui/material";

const ContactCard = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden text-center shadow-lg max-w-7xl mx-2 md:mx-auto lg:mx-auto my-20 p-14 sm:px-6 lg:px-8 text-slate-900">
      <div className="font-extrabold lg:text-8xl md:text-8xl text-4xl ">Get a Quote</div>
      <div className="p-10 text-slate-800 text-lg">
        Ready to take your project to the next level? Let's get started on a
        custom solution that fits your unique needs! Request a quote today and
        let's bring your vision to life!
      </div>
      <Button
        href="mailto:mwaynenjogu@gmail.com"
        style={{
          paddingLeft: 28,
          paddingRight: 28,
          paddingTop: 8,
          paddingBottom: 8,
          background: "rgb(15, 23, 42)",
          color: "#FFFFFF",
        }}
        className="px-8 py-2 bg-slate-900"
      >
        Message me
      </Button>
    </div>
  );
};

export default ContactCard;
