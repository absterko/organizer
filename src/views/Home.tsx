import "./Home.scss";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <p className="homeText">
        Introducing the <strong>ORGANIZER</strong> app that helps you avoid
        doing anything productive! With our innovative features like 'Snooze
        Forever' and 'Ignore All Reminders', you'll never have to worry about
        actually getting things done. It's the perfect app for those who prefer
        to live life on the edge of chaos!{" "}
      </p>
      <p className="homeText">
        PS: Kidding. We ain't got time to implement these cool features so you
        have to satisfy with classic time managment app. Enjoy!
      </p>
    </>
  );
};

export default Home;
