
const person = {
    name: 'Adhikrit',
    address: {
        line1: 'Baker Street',
        city: 'London',
        country: 'UK',
    },
    profiles: ['Twitter', 'LinkedIn', 'Instagram'],
    printProfile: () => {
        person.profiles.map(
            profile => console.log(profile) 
        )
    }
}


export default function LearningJavaScript() {
    return (
        <>
            <div>{person.name}</div>
            <div>{person.address.line1}</div>
            <div>{person.address.city}</div>
            <div>{person.address.country}</div>
            <div>{person.profiles[0]}</div>
            <div>{person.printProfile()}</div>
        </>
    )
}