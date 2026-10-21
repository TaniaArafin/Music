const HeaderComponent = ({title, content}) => {
  return (
    <div className="bg-eggplant-50 h-48 w-full bg-eggplant-100 rounded-lg p-4">
      <div className="text-blossom-500 font-semibold"> {title}</div>
      <div>
       {content}
      </div>
    </div>
  );
};

export default HeaderComponent;