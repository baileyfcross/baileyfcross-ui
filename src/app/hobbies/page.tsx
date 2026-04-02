export default function Hobbies() {
  const hobbies = [
    {
      id: 1,
      title: "Skiing",
      description: "Hitting the slopes and enjoying the mountains. Whether groomed trails or backcountry runs, there's nothing like a day on the mountain.",
      icon: "⛷️",
      level: "Advanced"
    },
    {
      id: 2,
      title: "Reading",
      description: "Always learning something new through books. Currently interested in technology, science fiction, and personal development.",
      icon: "📚",
      level: "Advanced"
    },
    {
      id: 3,
      title: "Hiking",
      description: "Exploring nature and staying active. Nothing beats a good trail and fresh mountain air.",
      icon: "🥾",
      level: "Intermediate"
    },
    {
      id: 4,
      title: "Gaming",
      description: "Enjoying both indie and AAA games. Particularly interested in strategy games and interactive storytelling.",
      icon: "🎮",
      level: "Advanced"
    },
    {
      id: 5,
      title: "Cooking",
      description: "Experimenting with different cuisines and techniques. There's something therapeutic about creating delicious meals.",
      icon: "👨‍🍳",
      level: "Beginner"
    },
    {
      id: 6,
      title: "Music",
      description: "Listening to various genres and occasionally trying to learn new instruments.",
      icon: "🎵",
      level: "Intermediate"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white-800 mb-8">My Hobbies</h1>
      
      <div className="mb-8">
        <p className="text-white-600 text-lg leading-relaxed max-w-3xl">
          When I&apos;m not coding, I enjoy exploring various interests and hobbies. 
          These activities help me stay creative, maintain work-life balance, and 
          often provide inspiration for my professional work.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((hobby) => (
          <div key={hobby.id} className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow">
            <div className="text-center mb-4">
              <span className="text-4xl">{hobby.icon}</span>
              <h3 className="text-xl font-semibold text-gray-800 mt-2">{hobby.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-4 leading-relaxed text-center">
              {hobby.description}
            </p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-800">Experience Level:</span>
              <span className={`px-3 py-1 text-xs rounded-full ${
                hobby.level === 'Advanced' 
                  ? 'bg-green-100 text-green-800' 
                  : hobby.level === 'Intermediate'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {hobby.level}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Let&apos;s Connect!</h2>
        <p className="text-gray-600 mb-4">
          Interested in any of these hobbies? I&apos;d love to connect and share experiences!
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Get In Touch
        </button>
      </div>
    </div>
  );
}