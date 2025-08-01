from flask import Blueprint, request, jsonify
import json
from datetime import datetime

onboarding_bp = Blueprint('onboarding', __name__)

# User progress storage (in production, use database)
user_progress = {}

# Detailed onboarding paths matching frontend component
onboarding_paths = [
    {
        'id': 0,
        'title': "Foundation Setup",
        'subtitle': "Get your development environment ready",
        'duration': "2-3 days",
        'color': "from-blue-600 to-purple-600",
        'items': [
            {
                'id': 0,
                'title': "Development Environment Setup",
                'description': "Install required tools, IDEs, and dependencies",
                'type': "setup",
                'duration': "2 hours",
                'resources': ["Setup Guide", "Tool List", "Installation Scripts"],
                'priority': "high",
                'completed': False
            },
            {
                'id': 1,
                'title': "Access & Permissions",
                'description': "Get access to repositories, tools, and services",
                'type': "access",
                'duration': "1 hour",
                'resources': ["Access Request Form", "Permission Matrix"],
                'priority': "high",
                'completed': False
            },
            {
                'id': 2,
                'title': "Team Introduction",
                'description': "Meet your team members and understand roles",
                'type': "social",
                'duration': "1 hour",
                'resources': ["Team Directory", "Org Chart", "Slack Channels"],
                'priority': "medium",
                'completed': False
            }
        ]
    },
    {
        'id': 1,
        'title': "Architecture Deep Dive",
        'subtitle': "Understand our system architecture and design patterns",
        'duration': "1-2 weeks",
        'color': "from-green-500 to-blue-600",
        'items': [
            {
                'id': 3,
                'title': "System Architecture Overview",
                'description': "High-level understanding of our microservices architecture",
                'type': "documentation",
                'duration': "4 hours",
                'resources': ["Architecture Diagrams", "Service Map", "API Documentation"],
                'priority': "high",
                'completed': False
            },
            {
                'id': 4,
                'title': "Database Schema & Models",
                'description': "Learn our data models and database relationships",
                'type': "database",
                'duration': "3 hours",
                'resources': ["ER Diagrams", "Schema Docs", "Migration History"],
                'priority': "high",
                'completed': False
            }
        ]
    }
]

@onboarding_bp.route('/onboarding/paths', methods=['GET'])
def get_onboarding_paths():
    """Get all onboarding paths"""
    try:
        return jsonify(onboarding_paths)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@onboarding_bp.route('/onboarding/progress/<user_id>', methods=['GET'])
def get_user_progress(user_id):
    """Get user's onboarding progress"""
    try:
        progress = user_progress.get(user_id, {
            'completed_items': set(),
            'active_phase': 0,
            'overall_progress': 0
        })
        
        # Convert set to list for JSON serialization
        progress_data = {
            'completed_items': list(progress['completed_items']),
            'active_phase': progress['active_phase'],
            'overall_progress': progress['overall_progress']
        }
        
        return jsonify(progress_data)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@onboarding_bp.route('/onboarding/progress/<user_id>', methods=['POST'])
def update_user_progress(user_id):
    """Update user's onboarding progress"""
    try:
        data = request.json
        completed_items = set(data.get('completed_items', []))
        active_phase = data.get('active_phase', 0)
        
        # Calculate overall progress
        total_items = sum(len(phase['items']) for phase in onboarding_paths)
        overall_progress = int((len(completed_items) / total_items) * 100) if total_items > 0 else 0
        
        user_progress[user_id] = {
            'completed_items': completed_items,
            'active_phase': active_phase,
            'overall_progress': overall_progress,
            'last_updated': datetime.now().isoformat()
        }
        
        return jsonify({
            "message": "Progress updated successfully",
            "progress": overall_progress
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@onboarding_bp.route('/onboarding/complete/<user_id>/<int:item_id>', methods=['POST'])
def complete_onboarding_item(user_id, item_id):
    """Mark an onboarding item as complete"""
    try:
        if user_id not in user_progress:
            user_progress[user_id] = {
                'completed_items': set(),
                'active_phase': 0,
                'overall_progress': 0
            }
        
        user_progress[user_id]['completed_items'].add(item_id)
        
        # Recalculate progress
        total_items = sum(len(phase['items']) for phase in onboarding_paths)
        completed_count = len(user_progress[user_id]['completed_items'])
        user_progress[user_id]['overall_progress'] = int((completed_count / total_items) * 100)
        
        return jsonify({
            "message": "Item marked as complete",
            "progress": user_progress[user_id]['overall_progress']
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500
