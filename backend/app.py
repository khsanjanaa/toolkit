from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import json
import uuid
from datetime import datetime, timedelta
import random

# Import blueprints
from artifacts import artifacts_bp
from onboarding import onboarding_bp
from ai_assistant import app as ai_app

app = Flask(__name__)
CORS(app)

# Configuration
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Ensure upload directory exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Register blueprints
app.register_blueprint(artifacts_bp, url_prefix='/api')
app.register_blueprint(onboarding_bp, url_prefix='/api')

# Global data storage (In production, use a proper database)
dashboard_data = {
    'stats': {
        'total_documents': 1247,
        'active_prs': 23,
        'team_members': 45,
        'knowledge_score': 94
    },
    'recent_activity': [],
    'notifications': []
}

# Dashboard endpoints
@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    """Get dashboard statistics"""
    return jsonify({
        'total_documents': dashboard_data['stats']['total_documents'],
        'active_prs': dashboard_data['stats']['active_prs'],
        'team_members': dashboard_data['stats']['team_members'],
        'knowledge_score': dashboard_data['stats']['knowledge_score'],
        'changes': {
            'documents': '+12%',
            'prs': '+3',
            'members': '+5',
            'score': '+2%'
        }
    })

@app.route('/api/dashboard/activity', methods=['GET'])
def get_recent_activity():
    """Get recent activity feed"""
    mock_activity = [
        {
            'id': 1,
            'type': 'pr',
            'title': 'Refactor authentication service',
            'author': 'Sarah Chen',
            'time': '2 hours ago',
            'status': 'merged'
        },
        {
            'id': 2,
            'type': 'doc',
            'title': 'API Design Guidelines v2.1',
            'author': 'Mike Johnson',
            'time': '4 hours ago',
            'status': 'updated'
        },
        {
            'id': 3,
            'type': 'meeting',
            'title': 'Architecture Review - Q1 2024',
            'author': 'Team Alpha',
            'time': '1 day ago',
            'status': 'uploaded'
        },
        {
            'id': 4,
            'type': 'pr',
            'title': 'Add Redis caching layer',
            'author': 'Alex Kumar',
            'time': '2 days ago',
            'status': 'review'
        }
    ]
    return jsonify(mock_activity)

@app.route('/api/dashboard/categories', methods=['GET'])
def get_categories():
    """Get knowledge base categories"""
    categories = [
        {'name': 'Documentation', 'count': 456, 'color': 'bg-blue-500'},
        {'name': 'Pull Requests', 'count': 234, 'color': 'bg-green-500'},
        {'name': 'Meeting Notes', 'count': 123, 'color': 'bg-purple-500'},
        {'name': 'Changelogs', 'count': 89, 'color': 'bg-orange-500'}
    ]
    return jsonify(categories)

# AI Assistant endpoints (integrating with existing ai_assistant.py)
@app.route('/api/ai/ask', methods=['POST'])
def ask_ai():
    """Proxy to AI assistant"""
    try:
        from ai_assistant import ask_ai as ai_ask
        return ai_ask()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/ai/history', methods=['GET'])
def get_ai_history():
    """Get AI chat history"""
    try:
        from ai_assistant import get_history
        return get_history()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# File upload endpoint for the upload component
@app.route('/api/upload', methods=['POST'])
def upload_files():
    """Handle file uploads from the upload component"""
    try:
        files = request.files.getlist('files')
        title = request.form.get('title', '')
        description = request.form.get('description', '')
        category = request.form.get('category', '')
        tags = request.form.get('tags', '').split(',') if request.form.get('tags') else []
        
        uploaded_files = []
        
        for file in files:
            if file and file.filename:
                filename = secure_filename(file.filename)
                unique_filename = f"{uuid.uuid4()}_{filename}"
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
                file.save(file_path)
                
                # Create artifact record
                artifact = {
                    'id': str(uuid.uuid4()),
                    'title': title or filename,
                    'content': description,
                    'type': category or 'documentation',
                    'author': 'Current User',  # In production, get from auth
                    'tags': tags,
                    'created_at': datetime.now().isoformat(),
                    'file_path': file_path,
                    'file_name': filename,
                    'file_size': os.path.getsize(file_path)
                }
                
                # Add to artifacts storage
                from artifacts import artifacts
                artifacts.append(artifact)
                uploaded_files.append(artifact)
                
                # Update dashboard stats
                dashboard_data['stats']['total_documents'] += 1
        
        return jsonify({
            'message': 'Files uploaded successfully',
            'uploaded_files': uploaded_files
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Search endpoint that matches frontend expectations
@app.route('/api/search', methods=['GET'])
def advanced_search():
    """Advanced search endpoint matching frontend component"""
    query = request.args.get('q', '').lower()
    content_type = request.args.getlist('type')
    authors = request.args.getlist('author')
    tags = request.args.getlist('tags')
    date_range = request.args.get('dateRange', '')
    priority = request.args.get('priority', '')
    sort_by = request.args.get('sortBy', 'relevance')
    
    # Mock search results that match frontend expectations
    mock_results = [
        {
            'id': 1,
            'title': "API Authentication & Security Guidelines",
            'type': "documentation",
            'author': "Sarah Chen",
            'date': "2024-07-28",
            'tags': ["security", "api", "authentication"],
            'priority': "high",
            'views': 145,
            'description': "Comprehensive guide for implementing secure authentication in our microservices architecture...",
            'lastModified': "3 days ago",
            'size': "2.3 MB",
            'status': "updated"
        },
        {
            'id': 2,
            'title': "Fix: Memory leak in user session management",
            'type': "pull-request",
            'author': "Mike Johnson",
            'date': "2024-07-25",
            'tags': ["bug-fix", "performance", "session"],
            'priority': "high",
            'views': 89,
            'description': "Resolved critical memory leak affecting user sessions during peak traffic periods...",
            'lastModified': "1 week ago",
            'size': "1.2 MB",
            'status': "merged"
        },
        {
            'id': 3,
            'title': "Q2 Architecture Review Meeting",
            'type': "meeting-notes",
            'author': "Engineering Team",
            'date': "2024-07-20",
            'tags': ["architecture", "review", "planning"],
            'priority': "medium",
            'views': 67,
            'description': "Discussion on microservices migration strategy and infrastructure scaling plans...",
            'lastModified': "2 weeks ago",
            'size': "856 KB",
            'status': "final"
        }
    ]
    
    # Apply filters
    results = mock_results
    
    if query:
        results = [r for r in results if 
                  query in r['title'].lower() or 
                  query in r['description'].lower() or
                  any(query in tag.lower() for tag in r['tags'])]
    
    if content_type:
        results = [r for r in results if r['type'] in content_type]
    
    if authors:
        results = [r for r in results if r['author'] in authors]
    
    if tags:
        results = [r for r in results if any(tag in r['tags'] for tag in tags)]
    
    if priority:
        results = [r for r in results if r['priority'] == priority]
    
    # Sort results
    if sort_by == 'date':
        results.sort(key=lambda x: x['date'], reverse=True)
    elif sort_by == 'views':
        results.sort(key=lambda x: x['views'], reverse=True)
    elif sort_by == 'title':
        results.sort(key=lambda x: x['title'])
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
