export default function LoginBar({showName}: {showName: boolean}) {
    return (
        <div className="flex px-10 py-10 items-center gap-4">
            <img src="https://cdn.pixabay.com/photo/2016/02/10/16/37/cat-1192026_640.jpg" alt="avatar" className="w-10 h-10 rounded-full"/>
            {showName && <span>Bob23</span>} 
        </div>
    )
}