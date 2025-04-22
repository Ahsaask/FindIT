// Dropdown.js 

'use client'
'use client'
import { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

export default function Dropdown({ text, items, onSelect, value }) {
    const [isOpen, setIsOpen] = useState(false);

    // Controlled label: if value is set, show it; else show placeholder text
    const selectedLabel = value || text;

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (item, event) => {
        event.preventDefault(); // Prevent scrolling
        if (onSelect) {
            onSelect(item); // Send selected item to parent
        }
        setIsOpen(false);
    };

    return (
        <div className="flex justify-start w-full pt-2">
            <div className="relative inline-block text-left w-full mx-2">
                <button
                    type="button"
                    className="inline-flex justify-between w-full
                               rounded-md border border-gray-300
                               shadow-sm px-4 py-2 bg-white text-sm
                               font-medium text-black hover:bg-gray-50"
                    onClick={toggleDropdown}
                >
                    {selectedLabel}
                    <FaCaretDown className="ml-2" />
                </button>

                {isOpen && (
                    <div className="origin-top-left absolute
                                    right-0 mt-2 w-full rounded-md
                                    shadow-lg bg-white ring-1 ring-black
                                    ring-opacity-5 focus:outline-none z-50">
                        <div className="py-1 max-h-56 overflow-y-auto">
                            {items.map((item, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="block px-4 py-2 text-sm text-black hover:bg-gray-100"
                                    onClick={(event) => handleSelect(item, event)}
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
