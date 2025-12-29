import Link from 'next/link'
import Image from "next/image";
import Content from './components/content';
import ChatField from './components/chatField';

export const metadata = {
  title: {
    absolute: "It's Haikal Here!",
  },
};

const Home = async () => {
  return (
        <ChatField />
  );
};

export default Home;
