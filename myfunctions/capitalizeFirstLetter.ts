// capitalize first letter
export default function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}
