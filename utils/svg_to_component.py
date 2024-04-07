import re
import sys
import os
import glob


def convert_attribute(attribute, delimeter: str):
    parts = attribute.split(delimeter)
    return parts[0] + "".join(part.capitalize() for part in parts[1:])


def convert_svg_to_react(svg_content, delimeter: str):

    regex_pattern = r"(\w+{}+\w+=)".format(re.escape(delimeter))

    attributes_to_convert = re.findall(regex_pattern, svg_content)

    for attribute in set(attributes_to_convert):
        react_attribute = convert_attribute(attribute, delimeter)
        svg_content = svg_content.replace(attribute, react_attribute)

    return svg_content


def create_react_component(svg_content, component_name):
    return f"""
const {component_name}: React.FC = () => (
  {svg_content}
);

export default {component_name};
"""


def main():
    # if len(sys.argv) < 2:
    #     print("Please provide the SVG file name as an argument.")
    #     return

    directory_path = "svg_temp/"

    # Get a list of all files in the directory (you can use patterns like '*.txt' to filter)
    file_list = glob.glob(os.path.join(directory_path, "*"))

    for svg_full_dir in file_list:
        # svg_file_name = sys.argv[1]
        # svg_full_dir = f"svg_temp/{svg_file_name}.svg"
        component_name, _ = os.path.splitext(os.path.basename(svg_full_dir))
        component_full_dir = f"components/custom/{component_name}.tsx"

        with open(svg_full_dir, "r") as file:
            svg_content = file.read()

        react_svg_content = convert_svg_to_react(svg_content, "-")
        react_svg_content = convert_svg_to_react(svg_content, "-")
        react_svg_content = convert_svg_to_react(react_svg_content, ":")
        react_component = create_react_component(react_svg_content, component_name)

        with open(component_full_dir, "w") as file:
            file.write(react_component)

        try:
            os.remove(svg_full_dir)
        except OSError as e:
            print(f"Error: {e.filename} - {e.strerror}")

        print(f"{component_name}.tsx has been created successfully!")


if __name__ == "__main__":
    main()
